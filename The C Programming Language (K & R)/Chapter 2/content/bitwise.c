#include <assert.h>

#define NDEBUG

unsigned getbits(unsigned num, int start, int range);

int main() {

    return 0;
}

/* getbits: get n bits from position p */
unsigned getbits(unsigned x, int p, int n) {
    assert(n > 0);
    assert(p > 0);

    return (x >> (p + 1 - n)) & ~(~0 << n);
}
