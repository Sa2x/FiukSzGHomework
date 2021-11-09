//
// Created by sasa on 2021. 11. 05..
//

#include <iostream>
#include <cstring>
#include "CaffParser.h"
CaffParser::CaffParser( std::ifstream &fr) : fr(fr) {
    this->caff = Caff();
}

void CaffParser::parseHeader(){
    unsigned char block_id_char;
    fr.read((char *) &block_id_char, 1);
    int block_id = (int) block_id_char;

    std::cout << block_id;
    char length[8];
    fr.read((char*) length, 8);
    unsigned long blocklength =   static_cast<uint64_t>(length[0]) |
                                  static_cast<uint64_t>(length[1]) << 8 |
                                  static_cast<uint64_t>(length[2]) << 16 |
                                  static_cast<uint64_t>(length[3]) << 24 |
                                  static_cast<uint64_t>(length[4]) << 32 |
                                  static_cast<uint64_t>(length[5]) << 40 |
                                  static_cast<uint64_t>(length[6]) << 48 |
                                  static_cast<uint64_t>(length[7]) << 56;

    std::cout<<blocklength;

    char magic[5];
    fr.read((char*) magic, 4);
    magic[4] = '\0';
    if(strcmp(magic,"CAFF") != 0){
        std::cout<<"Probleeeem";
    }

    char headerLength[8];
    fr.read((char*) headerLength, 8);
    unsigned long headerlength =   static_cast<uint64_t>(headerLength[0]) |
                                  static_cast<uint64_t>(headerLength[1]) << 8 |
                                  static_cast<uint64_t>(headerLength[2]) << 16 |
                                  static_cast<uint64_t>(headerLength[3]) << 24 |
                                  static_cast<uint64_t>(headerLength[4]) << 32 |
                                  static_cast<uint64_t>(headerLength[5]) << 40 |
                                  static_cast<uint64_t>(headerLength[5]) << 40 |
                                  static_cast<uint64_t>(headerLength[6]) << 48 |
                                  static_cast<uint64_t>(headerLength[7]) << 56;

    std::cout<<headerlength;

    char numanimchars[8];
    fr.read((char *) numanimchars, 8);
    unsigned long numanims = static_cast<uint64_t>(numanimchars[0]) |
                             static_cast<uint64_t>(numanimchars[1]) << 8 |
                             static_cast<uint64_t>(numanimchars[2]) << 16 |
                             static_cast<uint64_t>(numanimchars[3]) << 24 |
                             static_cast<uint64_t>(numanimchars[4]) << 32 |
                             static_cast<uint64_t>(numanimchars[5]) << 40 |
                             static_cast<uint64_t>(numanimchars[5]) << 40 |
                             static_cast<uint64_t>(numanimchars[6]) << 48 |
                             static_cast<uint64_t>(numanimchars[7]) << 56;

    caff.setNumberOfAnim(numanims);

    std::cout<<caff.getNumberOfAnim();
}


