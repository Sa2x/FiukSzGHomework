#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <stdexcept>
#include "CaffParser.h"

int main() {
    std::string input_line;
    std::getline(std::cin, input_line);
    //std::cin >> input_line;
    std::ifstream fin(input_line, std::ios::binary);
    if(!fin){
        throw std::invalid_argument("Wrong file name!");
    }
    CaffParser parser(fin);

    parser.parse();
    return 0;
}
