#include <assert.h>

#define NDEBUG

/*
 * Exercise 2-7.
 * Write a function invert(x,p,n) that returns x with the n bits
 * that begin at position p inverted (i.e., 1 changed into 0 and
 * vice versa), leaving the others unchanged.
 */

unsigned getbits(unsigned num, int start, int bits);
unsigned invert(unsigned num, int start, int bits);

int main() {
    unsigned x = 0362;

    assert(invert(x, 4, 3) ==  0356);

    return 0;
}

/* getbits: get n bits from position p */
unsigned getbits(unsigned x, int p, int n) {
    assert(p > 0);
    assert(x > 0);
    assert(p >= n);

    return (x >> (p + 1 - n)) & ~(~0 << n);
}

/* invert: returns x with n bits from position p inverted */
unsigned invert(unsigned x, int p, int n) {
    return (x & (~0 << (p + 1)))
        | (((~getbits(x, p, n)) & ~(~0 << (p + 1 - n))) << (p + 1 - n))
        | (x & ~(~0 << (p + 1 - n)));
}
