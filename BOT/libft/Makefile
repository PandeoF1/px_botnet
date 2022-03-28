# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: tnard <tnard@student.42lyon.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2021/11/02 12:16:46 by tnard             #+#    #+#              #
#    Updated: 2022/03/24 12:36:25 by tnard            ###   ########lyon.fr    #
#                                                                              #
# **************************************************************************** #

BLU			= \033[0;34m
GRN			= \033[0;32m
RED			= \033[0;31m
RST			= \033[0m
END			= \e[0m

SRCS    = ft_putnbr_fd.c ft_putendl_fd.c ft_putchar_fd.c ft_putstr_fd.c ft_striteri.c ft_strmapi.c ft_itoa.c ft_split.c ft_substr.c ft_strtrim.c ft_strjoin.c ft_atoi.c ft_bzero.c ft_isalnum.c ft_isalpha.c ft_isascii.c ft_isdigit.c ft_isprint.c ft_memchr.c ft_memcmp.c ft_memcpy.c ft_memmove.c ft_memset.c ft_strchr.c ft_strlcat.c ft_strlcpy.c ft_strlen.c ft_strncmp.c ft_strnstr.c ft_strrchr.c ft_tolower.c ft_toupper.c ft_strdup.c ft_calloc.c
SRCSB =	ft_lstmap.c ft_lstadd_back.c ft_lstiter.c ft_lstclear.c ft_lstdelone.c ft_lstadd_front.c ft_lstlast.c ft_lstsize.c ft_lstnew.c ft_lstadd_front.c $(SRCS)
SRCSO = $(SRCSB)
NAME = libft.a

OBJS_DIR = objs/
OBJS = $(SRCS:.c=.o)
OBJECTS_PREFIXED = $(addprefix $(OBJS_DIR), $(OBJS))

OBJSB = $(SRCSB:.c=.o)
OBJECTS_BONUS_PREFIXED = $(addprefix $(OBJS_DIR), $(OBJSB))

OBJSO = $(SRCSO:.c=.o)
OBJECTS_OTHER_PREFIXED = $(addprefix $(OBJS_DIR), $(OBJSO))

CC = gcc

CC_FLAGS = #-Wall -Wextra -Werror

$(OBJS_DIR)%.o : %.c libft.h
	@mkdir -p $(OBJS_DIR)
	@mkdir -p $(OBJS_DIR)/other
	@$(CC) $(CC_FLAGS) -c $< -o $@
	@printf	"\033[2K\r${BLU}[BUILD - $(NAME)]${RST} '$<' $(END)"

$(NAME): $(OBJECTS_PREFIXED)
	@ar r $(NAME) $(OBJECTS_PREFIXED) >/dev/null 2>&1 &
	@printf "\033[2K\r\033[0;32m[END]\033[0m $(NAME)$(END)"

all: $(NAME)

clean:
	@rm -rf $(OBJS_DIR)

fclean: clean
	@rm -f $(NAME)

bonus: $(OBJECTS_BONUS_PREFIXED)
	@ar r $(NAME) $(OBJECTS_BONUS_PREFIXED) >/dev/null 2>&1 &
	
other: $(OBJECTS_OTHER_PREFIXED)
	@ar r $(NAME) $(OBJECTS_OTHER_PREFIXED) >/dev/null 2>&1 &

re: fclean all

.PHONY:		all clean fclean re bonus