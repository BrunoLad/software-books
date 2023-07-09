#include <stdio.h>

int main() {
    int c = 0;

    while((c = getchar()) != EOF)
        putchar(c);

    printf("%d\n", c);
    return 0;
}
