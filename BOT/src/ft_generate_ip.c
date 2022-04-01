#include "../includes/px_botnet.h"

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
