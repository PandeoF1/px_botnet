#ifndef _ASM_X86_SETUP_H
#define _ASM_X86_SETUP_H

#define COMMAND_LINE_SIZE 2048

#ifndef __ASSEMBLY__

/* Interrupt control for vSMPowered x86_64 systems */
void vsmp_init(void);


void setup_bios_corruption_check(void);


#ifdef CONFIG_X86_VISWS
extern void visws_early_detect(void);
extern int is_visws_box(void);
#else
static __inline__ void visws_early_detect(void) { }
static __inline__ int is_visws_box(void) { return 0; }
#endif

extern int wakeup_secondary_cpu_via_nmi(int apicid, unsigned long start_eip);
extern int wakeup_secondary_cpu_via_init(int apicid, unsigned long start_eip);
/*
 * Any setup quirks to be performed?
 */
struct mpc_cpu;
struct mpc_bus;
struct mpc_oemtable;
struct x86_quirks {
	int (*arch_pre_time_init)(void);
	int (*arch_time_init)(void);
	int (*arch_pre_intr_init)(void);
	int (*arch_intr_init)(void);
	int (*arch_trap_init)(void);
	char * (*arch_memory_setup)(void);
	int (*mach_get_smp_config)(unsigned int early);
	int (*mach_find_smp_config)(unsigned int reserve);

	int *mpc_record;
	int (*mpc_apic_id)(struct mpc_cpu *m);
	void (*mpc_oem_bus_info)(struct mpc_bus *m, char *name);
	void (*mpc_oem_pci_bus)(struct mpc_bus *m);
	void (*smp_read_mpc_oem)(struct mpc_oemtable *oemtable,
                                    unsigned short oemsize);
	int (*setup_ioapic_ids)(void);
	int (*update_genapic)(void);
};

extern struct x86_quirks *x86_quirks;
extern unsigned long saved_video_mode;

#ifndef CONFIG_PARAVIRT
#define paravirt_post_allocator_init()	do {} while (0)
#endif
#endif /* __ASSEMBLY__ */


#endif /* _ASM_X86_SETUP_H */
