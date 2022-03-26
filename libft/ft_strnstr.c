/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strnstr.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tnard <tnard@student.42lyon.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/11/02 11:45:10 by tnard             #+#    #+#             */
/*   Updated: 2021/11/03 17:17:08 by tnard            ###   ########lyon.fr   */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_strnstr(const char *haystack, const char *needle, size_t len)
{
	size_t	l2;

	if ((int)len == -1 && ft_strlen(haystack) == 0 && ft_strlen(needle) != 0)
		return (0);
	if (len < 0)
		return (0);
	l2 = ft_strlen(needle);
	if (!l2)
		return ((char *)haystack);
	while (len-- >= l2)
	{
		if (!ft_memcmp(haystack, needle, l2))
			return ((char *)haystack);
		haystack++;
	}
	return (NULL);
}
