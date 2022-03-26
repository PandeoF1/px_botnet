/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strrchr.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tnard <tnard@student.42lyon.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/11/02 11:45:11 by tnard             #+#    #+#             */
/*   Updated: 2021/11/03 16:10:02 by tnard            ###   ########lyon.fr   */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_strrchr(const char *s, int c)
{
	int		i;
	char	*ss;

	i = 0;
	ss = 0;
	while (s[i])
	{
		if (s[i] == (const char)c)
			ss = (char *)(s + i);
		i++;
	}
	if (s[i] == (const char)c)
		ss = (char *)(s + i);
	return (ss);
}
