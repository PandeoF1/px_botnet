/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   px_ssh.h                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tnard <tnard@student.42lyon.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/03/24 12:30:18 by tnard             #+#    #+#             */
/*   Updated: 2022/03/24 12:30:18 by tnard            ###   ########lyon.fr   */
/*                                                                            */
/* ************************************************************************** */

#ifndef PX_SSH_H
# define PX_SSH_H

# include <libssh/libssh.h>
# include <curl/curl.h>
# include <stdlib.h>
# include <stdio.h> 
# include <string.h>
# include <unistd.h>
# include <fcntl.h>
# include <time.h>
# include <pthread.h>
# include <sys/time.h>
# include <unistd.h>
# include <string.h>

# define true 1
# define false 0

# include "../libft/libft.h"

char	*ft_strnjoin(char *s1, char *s2, int n);
char	*ft_strnjoinf(char *s1, char *s2, int n);

# define user_to_parse "root admin daemon User root default root admin root admin guest administrator user root support root admin"
# define pass_to_parse "root admin daemon admin pass default user password password 1234 guest 1234 user admin support default 123456"

# define user_len 17

#endif