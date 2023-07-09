#include <stdio.h>

int local_strlen(const char str[]);

int main() {

    printf("Length of 'abc' is %d\n", local_strlen("abc"));

    return 0; 
}

/* strlen: return length of s */
int local_strlen(const char s[]) {
    int i = 0;

    while (s[i] != '\0')
        ++i;

    return i;
}
