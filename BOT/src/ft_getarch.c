#include "../includes/px_botnet.h"

char *ft_getarch()
{
#if defined(__x86_64__) || defined(_M_X64)
	return "x86_64";
#elif defined(i386) || defined(__i386__) || defined(__i386) || defined(_M_IX86)
	return "x86_32";
#elif defined(__ARM_ARCH_2__) || defined(__ARM_ARCH_3__) || defined(__ARM_ARCH_3M__) || defined(__ARM_ARCH_4T__) || defined(__TARGET_ARM_4T)
	return "ARM4";
#elif defined(__ARM_ARCH_5_) || defined(__ARM_ARCH_5E_)
	return "ARM5"
#elif defined(__ARM_ARCH_6T2_) || defined(__ARM_ARCH_6T2_) || defined(__ARM_ARCH_6__) || defined(__ARM_ARCH_6J__) || defined(__ARM_ARCH_6K__) || defined(__ARM_ARCH_6Z__) || defined(__ARM_ARCH_6ZK__) || defined(__aarch64__)
	return "ARM6";
#elif defined(mips) || defined(__mips__) || defined(__mips)
	return "MIPS";
#elif defined(mipsel) || defined(__mipsel__) || defined(__mipsel) || defined(_mipsel)
	return "MPSL";
#elif defined(__powerpc) || defined(__powerpc__) || defined(__powerpc64__) || defined(__POWERPC__) || defined(__ppc__) || defined(__ppc64__) || defined(__PPC__) || defined(__PPC64__) || defined(_ARCH_PPC) || defined(_ARCH_PPC64)
	return "PPC";
#elif defined(__sparc__) || defined(__sparc)
	return "SPC";
#else
	return "idk";
#endif
}
