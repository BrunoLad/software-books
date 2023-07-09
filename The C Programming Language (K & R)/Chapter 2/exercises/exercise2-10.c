#include <assert.h>

/*
 * Exercise 2-10.
 * Rewrite the function lower, which converts upper case
 * letters to lower case, with a conditional expression
 * instead of if-else.
 */


int chapter_lower(char character);
int lower(char character);

int main() {

    assert(chapter_lower('A') == lower('A'));
    assert(chapter_lower('*') == lower('*'));
    assert(lower('B') == 'b');
    assert(lower('&') == '&');

    return 0;
}

int chapter_lower(char c) {
    if (c >= 'A' && c <= 'Z')
        return c + 'a' - 'A';
    else
        return c;
}

int lower(char c) {
    return (c >= 'A' && c <= 'Z') ?
        c + 'a' - 'A' :
        c;
}
