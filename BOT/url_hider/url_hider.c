#include <string.h>
#include <stdio.h>
#include <stdlib.h>

char	*init_randomizer(char *test, int pos)
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
			tmp[i] = test[i] + (2 + pos);
			a = 0;
		}
		else
		{
			tmp[i] = test[i] - (3 + pos);
			a++;
		}
		i++;
	}
	tmp[i] = '\0';
	return (tmp);
}

int	main(int argc, char *argv[])
{
	if (argc != 2)
	{
		printf("Usage: %s `url to hide (whitout http(s) and the path, just the domain / sub.domain)`\n", argv[0]);
		return (1);
	}
	else
		printf("Url to hide: %s\n", init_randomizer(argv[1], 4));
	return (0);
}
