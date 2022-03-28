#include "../../includes/px_botnet.h"

char* host_to_ip(const char* hostname){
  struct hostent *host_entry;
  host_entry=gethostbyname(hostname);
  if(host_entry){
    return inet_ntoa (*(struct in_addr *)*host_entry->h_addr_list);
  }
  else return NULL;
}

bool http_create_socket(SOCKET *sock, SOCKADDR_IN *sin, const char *ip){
  *sock = socket(AF_INET, SOCK_STREAM, 0);		//init the socket

  sin->sin_addr.s_addr = inet_addr(ip);			//init the socket address on ip / port / network
  sin->sin_port = htons(PORT);
  sin->sin_family = AF_INET;

  if(connect(*sock, (SOCKADDR*)sin, sizeof(*sin)) == SOCKET_ERROR)return false;

#ifdef linux
  fcntl(*sock, F_SETFL, O_NONBLOCK);
#elif defined WIN32
  u_long mode=1;
  ioctlsocket(*sock,FIONBIO,&mode);
#endif

  return true;

}

char* http_request(SOCKET sock, const char *hostname, const char *page){
  char buf[BUFSIZ];
  int len = 0;
  int selection;

  //Create a GET HTTP request
  len = sprintf(buf, "\
GET %s %s\r\n\
Host: %s\r\n\
%s\r\n\
\r\n",
		page, HTTP_VERSION,
		hostname,
		CONNECTION_TYPE);

  //send the http request
  send(sock, buf, strlen(buf), 0);

  // timeout
  struct timeval tv;
  tv.tv_sec = TIMEOUT_SEC;
  tv.tv_usec = TIMEOUT_MSEC;

  fd_set fdread;
  FD_ZERO(&fdread);
  FD_SET(sock, &fdread);

  // the result is the remote page content.
  // will be reallocated at each call of recv
  char *result = malloc(sizeof(char));
  result[0] = '\0';

  while(1){
    selection = select(sock+1, &fdread, NULL, NULL, &tv);

    if (!selection || !(FD_ISSET(sock, &fdread))){
      break;
    }
    else{
      len = recv(sock, buf, BUFSIZ, 0);
      if(len == 0)break;
      result = realloc(result, (strlen(result) + len + 1) * sizeof(char));
      strncat(result, buf, len);
    }
  }

  return result;
}

char* http_header_strip(char* content){
  return strstr(content, "\r\n\r\n")+4;
}
