from typing import Any, Dict, List

class Part1():

  def __init__(self):
    self._day = '4'
    self._lines = []
    with open(f"src/_2025/day{self._day}/part1_input.txt") as part1_file:
      for line in part1_file:
        self._lines.append(line.strip())
        
  def compute(self) -> int:
    joltage_sum = 0

    for bank in self._lines:
      first_max=0
      index_first_max=0
      second_max=0
      for i in range(len(bank)-1):
        first_max, index_first_max = (bank[i], i) if int(bank[i]) > int(first_max) else (first_max, index_first_max)

      for j in range(index_first_max+1, len(bank)):
        second_max = bank[j] if int(bank[j]) > int(second_max) else second_max
      
      joltage = int(first_max + second_max)
      #print(f"joltage={joltage}")
      joltage_sum += joltage
      #print(f"joltage_sum={joltage_sum}")

    return joltage_sum