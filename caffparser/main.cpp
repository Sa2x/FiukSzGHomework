#include <iostream>
#include <fstream>
#include <vector>
#include "CaffParser.h"

int main() {
    std::ifstream fin("/home/sasa/data1/projects/FiukSzGHomework/caffparser/caffs/3.caff",std::ios::out | std::ios::binary);
    if(!fin){
        std::cout<<"baaj";
    }
    CaffParser parser(fin);

    parser.parseHeader();
    return 0;
}
