# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: tnard <tnard@student.42lyon.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/03/24 12:35:04 by tnard             #+#    #+#              #
#    Updated: 2022/03/28 06:34:07 by tnard            ###   ########lyon.fr    #
#                                                                              #
# **************************************************************************** #

BLU			= \033[0;34m
GRN			= \033[0;32m
RED			= \033[0;31m
RST			= \033[0m
END			= \e[0m

SRCS		= px_botnet.c src/ft_strnjoin.c src/ft_free_split.c src/ft_generate_ip.c src/ft_intlen.c src/ft_scan_world.c \
			  src/ft_get_id.c src/request/ft_request.c src/request/http.c src/protocol/global.c src/protocol/OVHL7.c \
			  src/protocol/CNC.c src/protocol/HOLD.c src/protocol/HTTP.c src/protocol/JUNK.c src/protocol/RANDHEX.c \
			  src/protocol/STD.c src/protocol/TCP.c src/protocol/UDPRAW.c src/protocol/UNKNOWN.c src/protocol/XTDCUSTOM.c \
			  src/protocol/UDP.c
NAME		= px_botnet
OBJS_DIR	= objs/
PROJECT_H	= includes/px_botnet.h
OBJS		= $(SRCS:.c=.o)
OBJECTS_PREFIXED = $(addprefix $(OBJS_DIR), $(OBJS))
CC			= gcc
CC_FLAGS	= -O3 -Ofast -flto -march=native -ffast-math -Wno-format-extra-args -Wno-unused-result -Wno-format-contains-nul -lssh -O2 -lpthread#-Wall -Werror -Wextra

$(OBJS_DIR)%.o : %.c $(PROJECT_H)
	@mkdir -p $(OBJS_DIR)
	@mkdir -p $(OBJS_DIR)src
	@mkdir -p $(OBJS_DIR)src/request
	@mkdir -p $(OBJS_DIR)src/protocol
	@$(CC) $(CC_FLAGS) -c $< -o $@
	@printf	"\033[2K\r${BLU}[BUILD]${RST} '$<' $(END)"

$(NAME): $(OBJECTS_PREFIXED) maker
	@$(CC) -o $(NAME) $(OBJECTS_PREFIXED) $(CC_FLAGS) libft/libft.a
	@printf "\033[2K\r\033[0;32m[END]\033[0m $(NAME)$(END)\n"

all: $(NAME)

maker:
	@make -C libft

clean:
	@make clean -C libft
	@rm -rf $(OBJS_DIR)
	@printf "\033[2K\r${GRN}[CLEAN]${RST} done$(END)"

fclean: clean
	@make fclean -C libft
	@rm -f $(NAME)
	@printf "\033[2K\r${GRN}[FCLEAN]${RST} done$(END)"

re: fclean all

.PHONY:		all clean fclean re