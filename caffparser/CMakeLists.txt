cmake_minimum_required(VERSION 3.16)
project(caffparser)

set(CMAKE_CXX_STANDARD 14)

add_executable(caffparser main.cpp CaffParser.cpp CaffParser.h Caff.cpp Caff.h Ciff.cpp Ciff.h)
