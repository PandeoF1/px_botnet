#ifndef _M68K_SIGINFO_H
#define _M68K_SIGINFO_H

#ifndef __uClinux__
#define HAVE_ARCH_SIGINFO_T
#define HAVE_ARCH_COPY_SIGINFO
#endif

#include <asm-generic/siginfo.h>

#ifndef __uClinux__

typedef struct siginfo {
	int si_signo;
	int si_errno;
	int si_code;

	union {
		int _pad[SI_PAD_SIZE];

		/* kill() */
		struct {
			__kernel_pid_t _pid;	/* sender's pid */
			__kernel_uid_t _uid;	/* backwards compatibility */
			__kernel_uid32_t _uid32; /* sender's uid */
		} _kill;

		/* POSIX.1b timers */
		struct {
			timer_t _tid;		/* timer id */
			int _overrun;		/* overrun count */
			char _pad[sizeof( __ARCH_SI_UID_T) - sizeof(int)];
			sigval_t _sigval;	/* same as below */
			int _sys_private;       /* not to be passed to user */
		} _timer;

		/* POSIX.1b signals */
		struct {
			__kernel_pid_t _pid;	/* sender's pid */
			__kernel_uid_t _uid;	/* backwards compatibility */
			sigval_t _sigval;
			__kernel_uid32_t _uid32; /* sender's uid */
		} _rt;

		/* SIGCHLD */
		struct {
			__kernel_pid_t _pid;	/* which child */
			__kernel_uid_t _uid;	/* backwards compatibility */
			int _status;		/* exit code */
			clock_t _utime;
			clock_t _stime;
			__kernel_uid32_t _uid32; /* sender's uid */
		} _sigchld;

		/* SIGILL, SIGFPE, SIGSEGV, SIGBUS */
		struct {
			void *_addr; /* faulting insn/memory ref. */
		} _sigfault;

		/* SIGPOLL */
		struct {
			int _band;	/* POLL_IN, POLL_OUT, POLL_MSG */
			int _fd;
		} _sigpoll;
	} _sifields;
} siginfo_t;

#define UID16_SIGINFO_COMPAT_NEEDED

/*
 * How these fields are to be accessed.
 */
#undef si_uid
#define si_uid		_sifields._kill._uid

#endif /* !__uClinux__ */

#endif
