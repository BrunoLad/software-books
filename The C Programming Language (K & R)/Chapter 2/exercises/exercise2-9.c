#include <assert.h>

/*
 * Exercise 2-9.
 * In a two's complement number system, x &= (x-1) deletes
 * the rightmost 1-bit in x. Explain why. Use this observation
 * to write a faster version of bitcount.
 */

#define NDEBUG

int bitcount(unsigned num);
int chapter_bitcount(unsigned num);

int main() {

    assert(bitcount(1000) == chapter_bitcount(1000));
    assert(bitcount(0xfab08) == chapter_bitcount(0xfab08));

    return 0;
}

/* bitcount: count 1 bits in x */
int bitcount(unsigned x) {
    int b = 0;

    do {
        b++;
    } while((x &= (x - 1)) != 0);

    return b;
}

int chapter_bitcount(unsigned x) {
    int b;

    for (b = 0; x != 0; x >>= 1)
        if (x & 01)
            b++;
    return b;
}
