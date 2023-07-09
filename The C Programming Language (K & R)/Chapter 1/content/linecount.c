#include <stdio.h>

int main() {

    int nl = 0, c;
    long nc = 0;

    while ((c = getchar()) != EOF) {
        if (c == '\n')
            ++nl;
        nc++;
    }

    printf("Number of characters: %ld\n", nc);
    printf("Number of lines: %d\n", nl);

    return 0;
}
