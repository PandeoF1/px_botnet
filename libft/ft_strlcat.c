/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strlcat.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tnard <tnard@student.42lyon.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/11/02 11:45:05 by tnard             #+#    #+#             */
/*   Updated: 2021/11/05 13:36:46 by tnard            ###   ########lyon.fr   */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

size_t	ft_strlcat(char *dest, const char *src, size_t dstsize)
{
	size_t	i;
	size_t	srclen;
	size_t	destlen;

	srclen = ft_strlen(src);
	if (dstsize == 0)
		return (srclen);
	destlen = 0;
	while (dest[destlen])
		destlen++;
	i = 0;
	while (src[i] && destlen + i < (dstsize - 1)) // ! potential segfault inver condition
	{
		dest[i + destlen] = src[i];
		i++;
	}
	if (i < dstsize)
		dest[destlen + i] = '\0';
	if (destlen > dstsize)
		return (srclen + dstsize);
	return (destlen + srclen);
}
