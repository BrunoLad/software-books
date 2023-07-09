#include <stdio.h>

int local_atoi(char str[]);
int local_lower(int character);

int main() {

    return 0;
}

/* atoi: convert s to integer */
int local_atoi(char s[]) {
    int i, n;

    n = 0;
    for (i = 0; s[i] >= '0' && s[i] <= '9'; ++i)
        n = 10 * n + (s[i] - '0');
    return n;
}

/* lower: convert c to lower case; ASCII only */
/* doesn't work for EBCDIC, for instance */
int local_lower(int c) {
    if (c >= 'A' && c <= 'Z')
        return c + 'a' - 'A';
    else
        return c;
}

unsigned long int next = 1;
/* rand: return pseudo-random integer on 0..32767 */
int local_rand(void)
{
    next = next * 1103515245 + 12345;
    return (unsigned int)(next/65536) % 32768;
}

/* srand: set seed for rand() */
void local_srand(unsigned int seed)
{
    next = seed;
}
