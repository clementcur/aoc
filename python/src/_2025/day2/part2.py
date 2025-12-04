from typing import Any, Dict, List

class Part2():

  def __init__(self):
    self._day = '2'
    self._lines = []
    with open(f"src/_2025/day{self._day}/part2_input.txt") as part1_file:
      for line in part1_file:
        self._lines.append(line.strip())
        
  def compute(self) -> int:
    product_ids = self._lines[0].split(',')

    illegal_ids_sum = 0
    for product_id in product_ids:
      #print(f"product_id={product_id}")

      product_indexes = product_id.split('-')
      product_range = range(int(product_indexes[0]),int(product_indexes[1])+1)

      for product_step in product_range:
        product_step_str = str(product_step)
        split_indices = len(product_step_str)

        for i in range(1, split_indices):
          slices = []
          for s in range(0, len(product_step_str), i):
            slices.append(product_step_str[s:s+i])

          if len(set(slices)) == 1:
            illegal_ids_sum += product_step
            #print(f"=>invalid_id={product_step}")
            break
        
    return illegal_ids_sum