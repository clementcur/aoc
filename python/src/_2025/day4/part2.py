from typing import Any, Dict, List

class Part2():

  def __init__(self):
    self._day = '4'
    self._lines = []
    with open(f"src/_2025/day{self._day}/part2_input.txt") as part1_file:
      for line in part1_file:
        self._lines.append(line.strip())
  
  def compute(self) -> int:
    joltage_len = 12
    joltage_sum = 0

    for bank in self._lines:
      joltage=""
      joltage_indices=[]

      for i in range(joltage_len):
        j = 0 if i == 0 else joltage_indices[i-1] + 1
        n = len(bank) if i == joltage_len-1 else len(bank)-(joltage_len - len(joltage)) + 1
        joltage_i, joltage_indices_i = self._get_max_and_index_in_range(bank[j:n])
        joltage += joltage_i
        joltage_indices_i += j
        joltage_indices.append(joltage_indices_i)
      
      #print(f"joltage={joltage}")
      joltage_sum += int(joltage)
      #print(f"joltage_sum={joltage_sum}")

    return joltage_sum
  
  def _get_max_and_index_in_range(self, the_range: str) -> str | int:
    max=0
    index_max=0
    for i in range(len(the_range)):
        max, index_max = (int(the_range[i]), i) if int(the_range[i]) > max else (max, index_max)
        
    return str(max), index_max