/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strdup.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tnard <tnard@student.42lyon.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/11/03 08:56:41 by tnard             #+#    #+#             */
/*   Updated: 2021/11/03 16:28:10 by tnard            ###   ########lyon.fr   */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_strdup(const char *s1)
{
	char	*ptr;
	int		n;
	int		l;

	l = 0;
	n = 0;
	while (s1[l])
		l++;
	ptr = malloc(sizeof(char) * l + 1);
	if (ptr == NULL)
		return (NULL);
	while (s1[n])
	{
		ptr[n] = s1[n];
		n++;
	}
	ptr[n] = '\0';
	return (ptr);
}
