#ifndef HTTP_H
#define HTTP_H

/**
   @summary Networking related function
   @author  Olivier DREVET
   @date    2011
*/


#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <errno.h>
#include <time.h>
#include <stdbool.h>
#include <unistd.h>
#include <fcntl.h>

char* strdup (const char* str);

#ifdef WIN32
#include <winsock2.h>
#elif defined linux
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/time.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>		/* close */
#include <netdb.h> 	        /* gethostbyname */
#define INVALID_SOCKET -1
#define SOCKET_ERROR   -1
#define closesocket(s) close(s)
typedef int SOCKET;
typedef struct sockaddr_in SOCKADDR_IN;
typedef struct sockaddr SOCKADDR;
typedef struct in_addr IN_ADDR;
#endif

#define PORT		 80
#define USER_AGENT      "User-Agent: Mozilla/5.0 (X11; U; Linux i686; fr; rv:1.9.2.10) Gecko/20100922 Ubuntu/11.10 (lucid) Firefox/5.0 GTB7.1\r\n"
#define ENCODE_TYPE     "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/ *;q=0.8\r\n"
#define CONNECTION_TYPE "Connection: close\r\n"
#define HTTP_VERSION    "HTTP/1.1"
#define TIMEOUT_SEC     5
#define TIMEOUT_MSEC    0

/* get an ip from an hostname (DNS search) */
char* host_to_ip(const char* hostname);

/* create a socket in INET TCP mode on PORT (for HTTP request) */
bool http_create_socket(SOCKET *sock, SOCKADDR_IN *sin, const char *ip);

/* perform an HTTP and return the result. Note : the result must be freed */
char* http_request(SOCKET sock, const char *hostname, const char *page);

/*return a pointer just after the HTTP headers in content*/
char* http_header_strip(char* content);

#endif
