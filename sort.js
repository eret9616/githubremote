// 1 选择排序
// selection sort
function ss(arr){
    for(let i = 0;i<arr.length;i++){
        let minIndex = i
        for(let j = i;j<arr.length;j++){
            if(arr[j] >= arr[minIndex]){
                minIndex = j
            }
        }
        swap(arr,i,minIndex)
    }
}


// 2插入排序
// insert sort 不使用平移的方式 操作数比较多
function is2(arr){
    for(let i = 0;i<arr.length;i++){
        for(let j = i;j-1>=0;j--){
            if(arr[j] < arr[i]){
                swap(arr,i,j)
            }else{
                break
            }
        } 
    }
}

// insert sort2 使用平移的方式 操作数比较少
function is(arr){
    for(let i = 0;i<arr.length;i++){
        let t = arr[i]
        for(let j = i; j-1>0 && t<arr[j-1] ;j--){
            arr[j] = arr[j-1];
        }
        arr[j] = t
    }
}

// 插入排序优于选择排序，是因为如果是有序数列，插入排序会变成O(n)
// 而选择排序永远是O(n2)




// 3 归并排序
// mergesort
function mergesort(arr,left,right){
    if(left > right) return
    let middle = left + right / 2
    mergesort(arr,left,middle)
    mergesort(arr,middle+1,right)
    merge(arr,left,middle,right)
}
function merge(arr,l,mid,r){
    let _arr = cloneDeep(arr)
    let i = 0;
    let j = mid+1
    // 遍历数组
    for(let k =l;k<= r ; k++){
        if(_arr[i-l]>_arr[j-l]){
            arr[k] = arr[j-l]
            j++
        }else if (_arr[i-l] <= _arr[j-l]){
            arr[k] = arr[i-l]
            i++
        } else if(i> mid){
            arr[k] = _arr[j-l]
            j++
        }else if (j > r){
            arr[k] = arr[i-l]
            i++
        }
    }
} 

// mergesort bt 自下而上的算法
function mergesortbt(arr){
    let n = arr.length
    // 遍历合并的区间长度
    for(let size = 1; size<n;size +=size){
        // 遍历合并的两个区间的起始位置i
        // 合并[i,i+size-1]和[i+size,i+size+size-1] 
        for(let i = 0; i+size < n ; i=i+size+size){
            //          ↑ 第二个区间的起始位置还在范围内
            merge(arr,i,i +size-1,Math.min(i+size+size-1,n))    
        }
    }
}




// 求逆序对个数
// 在mergesort的过程中整理，时间复杂度是O(nlogn)
// 在merge过程中
// merge函数的如果temp[i]>temp[j]
// 此时count += mid - i + 1,最后统计一下count的值

// 思考一下，正常的思路是做一个双重的循环，遍历所有元素两两对比，这样复杂度是O(n^2)
// 归并排序做到了两两对比..并且排除了不需要多余重复对比的情况，
// 即：在有序的序列对中，如果 arr[i]> arr[j] 那么 从mid-i+1 这些个元素都是>arr[j]（逆序）的




// 4 快速排序
function quickSort(arr,left,right){
    if(left >= right) return
    let p  = partition(arr,left,right)
    quickSort(arr,left,p)
    quickSort(arr,p,right)
}

// 4.1 单路快速排序
// 数组左侧是l 右侧是r，初始值j是l，i是l+1，每次i循环 循环不变量 arr[l+1,...j]<v  arr[j+1...i-1] >=v
// 问题1：如果对于有序序列，速度会退化为O(n2) 是因为每次分区都分为左边一个，而每次左边都是最小的，右边所有剩下的，划分区太不平均。 解决办法：选一个随机数为pivot，在partition函数中一开始先选一个[i,j]之间的随机索引，然后将最左边的元素和这个交换
// 问题2：如果数组中都是相同的元素，对于有序序列速度会退化为O(n2) 解决办法：使用双路快速排序
// 快速排序和归并排序哪个更快？ 同样是O nlogn  对于一个完全随机的数组，quicksort会更快一点，是因为相比mergesort 比较的操作更少，
function partition (arr,l,r) {
    // 循环不变量 arr[l+1..j]<v; arr[j+1...i] >= v
    let j = l
    for(let i = l+1;i<=r;i++){
        // if(arr[i]>=arr[l]){ 这里可以不写 
            // continue;
        // }
        if(arr[i]<arr[l]){
            j++
            swap(arr,i,j)
        }
    }
    swap(arr,l,j)
    return j
}



// 4.2 双路快速排序 双路快速排序的目的是，
// 单路快速排序把<v和>=v都放在了数组的一端，双路快速排序将<v和>=v的放在了数组的两端
// 原理，从左边找一个>=v的 从右边找一个<=v的， 交换位置，i++,j--
// 这样依然是把数组分成<v和>v的两部分，关键在于对于=v的情况，如果=标定点也要进行交换,这样就相当于把两个等于标定点的元素分散到划分的两个区间了
// 这是和之前单路快速排序最大的不同，
// 所以此时循环不变量应该是，一侧<=v 一侧>=v


// 一开始i指向l+1，j指向r
// 循环不变量 arr[l+1...i-1] <=v    arr[j+1...r] >=v
// 此时如果是所有数组元素都相同，也不会有问题，满足循环不变量
function partition(arr,l,r){
    let i = l+1,j=r 
    while(true){ // 注意这里的细节，i<=j,而不是i<j 为什么？ 因为循环不变量中的[l+1...i-1] <= v [j+1...r] >=v 如果i<j就停下来，那么最后i是等于j的，这个值不知道是大于等于v还是小于等于v
        while(i<=j && arr[i] < arr[l]){
            i++
        }
        while(i<=j && arr[j] > arr[l]){
            j--
        }
        if(i>=j) break
        swap(arr,i,j)
        i++
        j--
    }
    //      注意这里j是和l交换的，而不是i和l交换，因为循环不变量决定了此时的j<v
    swap(arr,l,j)
    return j
}


// 双路快速排序复杂度分析
// 最坏复杂度O(n^2) 但是这样的概率是非常非常低的，比小行星撞地球 彩票中大奖还低，只要数据规模达到100以上都不会退化到On2，如果数据规模低个位数，退化也无所谓
// 快速排序本质是一个随机算法 每次选的标定点都不一样，我们不应该用最坏的复杂度 使用期望，复杂度是O(nlogn) 不要问为啥
// 虽然每次划分不一定是平分的，但是从期望的角度来看是平分的，层数的期望值O(nlogn) 复杂度期望值：O(nlogn)
// 普通算法：看最差 能找到一组数据100%恶化
// 随机算法：看期望 没有一组数据能100%恶化
// 多次调用？ 尝试均摊分析


// 4.3 三路快速排序
// 循环不变量arr[l+1...lt] < v      arr[lt+1...i-1] == v   arr[gt...r] > v   （此时i == gt，也是循环结束的条件）
// 这样的优点是不需要对等于v的进行交换，如果所有数组元素都相同，复杂度将变为O(n)级别
function sort(arr,l,r) {
    let lt = l, gt = r+1;
    let i = l+1;

    while(i<gt){
        if(arr[i]<arr[l]){
            lt++
            swap(arr,i,lt)
            i++; //因为交换完的本来就是小的
        }else if(arr[i] > arr[l]){
            gt--
            swap(arr,i,gt) //交换完后，这个元素不知道是大还是小，所以i并不++
        }else{ //arr[i] == arr[l]
            i++
        }
    }
    swap(arr,l,lt)
    //arr[l,lt-1] < v,arr[lt,gt-1] ==v,arr[gt,r] > v 循环不变量
    sort(arr,l,lt-1)
    sort(arr,gt,r)
}
// 写算法遇到边界问题，在于对循环不变量的不了解
// 测试规模对于三路快速排序结果 比二路的慢一点，但如果所有元素都一样 就会变成O(n)的算法


// 4.4 Sort Colors
// 给定一个包含红色白色和蓝色一共n个元素的数组，原地对他们进行排序，是的相同颜色的元素相邻，并按照红色，白色，蓝色顺序排列。
// 此体重，我们使用整数0,1,2分别表示红色，蓝色和白色
// 示例，输入：[2,0,2,1,1,0] 输出：[0,0,1,1,2,2]
// 使用常数空间的扫描法

// 循环不变量: [0...lt] ==0  [lt+1,i] == 1 [gt,n-1] ==2  
function sortColors(nums){
    let i = 0
    let lt =i-1,  gt = nums.length
    while( i<gt) {
        if(nums[i] ===1){
            i++
        }else if (nums[i]>1){
            gt--
            swap(arr,i,gt)
        }else if(nums[i]<1){
            lt++
            swap(arr,i,lt)
            i++
        }
    }
}


// 4.5 select K问题
// 给出一个无序数组，找出数组的第K小的元素
// 正常先排序再找是 O(nlogn)
// 使用快速排序算法的partition思路 可以在O(n)时间完成
// 这样的算法复杂度： 首先要对所有数组进行一次遍历，随机选择一个标定点对数组进行划分
// 如果这个元素正好是k，那么就结束了，否则会或者去左边找，或者去右边找
// 由于是一个随机算法，对于所有元素选择的概率是相等的，所以第一次大概其是将数组平均的分成两部分，第一次对n遍历，第二次对n/2遍历，第三次对n/4遍历   n+n/2+n/4+...+1 = 2n => O(n)
function selectK(arr,l,r,k){
    const p = partition(arr,l,r)
    if(p ===k){
        return arr[p]
    } else if (r > k){
        return selectK(arr,l,p-1,k)
    }else if (r< k){
        return selectK(arr,p+1,r,k)
    }
}

function partition(arr,l,r){
    let i = l+1
    let j = r
    while(true){
        while(arr[i]>arr[l] && i<=j){
            i--
        }
        while(arr[j]>arr[i] && i<=j){
            j++
        }
        if(arr[i]>=j) break
        swap(arr,i,j)
        i--
        j++
    }
    swap(arr,l,j)
    return j
}




//5 二分查找法 BinarySearch
// 对比select K 1+1+1+...+1 = logn => O(logn) 我们没有把排序的时间算进去 排序叫做二分查找法的前置条件
// 如果计算排序，就是O(nlogn),因为排序时间是nlogn,二分查找是logn 加一起整体是logn的复杂度

// 应用：多次查找。  先排序依次，后面多次用二分查找，
//   排一次序是nlogn n次查找是nlogn 整体是2nlogn， 如果查找次数非常多，那么均摊查找的复杂度就是logn
//  (* 如果不进行排序，每次都线性查找，最坏情况下就是n次，整体是n2 每次都是O(n) )
// 多次查找，花点时间将数组整理成有序的，是一件非常值得的事情
// * mid = (l+r) /2 可能整形溢出 改为mid = l + (r-l) /2的写法
// 5.1 递归实现二分查找法
function search(arr,l,r,target){

    if(l > r) return -1

    let mid = l + (r-l)/2

    if(arr[mid] === target){
        return mid
    }

    if(arr[mid] < target){
        return search(data,mid+1,r,target)
    }

    return search(data,l,mid-1,target)
}

// 5.2非递归实现
function search(arr,target){

    let l = 0,r= arr.length-1

    // 循环不变量： 在data[l,r] 的范围中查找target
    while(l<=r){
        let mid = arr[l+(r-l)/2]
        if(data[mid] === target ){
            return mid 
        }else if(data[mid] > target){
            l = mid-1
        }else {
            r = mid+1
        }
    }
    return -1
}

// 修改循环不变量定义 实现二分查找
// 注意，所有的边界问题，都是对循环不变量的不熟悉。不需要你背

// 二分查找法变种：upper
// 查找大于target的最小值
function upper(arr,target){
    let l = 0
    let r = arr.length // 这里r大于了数组的最大长度（数组外面的一个索引） 因为这样定义，对于任意target值，都能找到对应的索引，如果是在r这个位置，说明不存在
    // 循环不变量： 区间[l,r]中存在一个大于target的最小值
    while(l<r){ // 不需要l==r 因为[l,r]里面一定有解，上面的二分法可以l==r，因为可能没解
        let mid = l+(r-l)/2
        if((arr[mid]) >target){
            r = mid
        }else if (arr[mid] <=target){
            l = mid+1
        }
    }
    // 当l等于r
    return r
}

// 如果数组中存在元素，返回最大索引，如果数组中不存在元素，返回upper
function upper_ceil(arr,target){
    let r = upper(arr,target)
    if(arr[r-1] == target){
        return r-1
    }
    return r
}

// 和上面的一样，但如果有它本身，返回多个索引中最小的
function lower_ceil(arr,target){
    let l = 0;
    let r = arr.length;
    // 循环不变量：区间[l,r]中存在一个大于target的最小值
    while(l<r){
        let mid = l+(r-l)/2
        if(arr[mid] >= target){
            r = mid
        }else if(arr[mid]<target){
            l = mid+1
        }
    }
    return r
}


// 查找小于target的最大值
// 首先要确定l和r的取值， 此时l应该取-1，能确保[l,r]中一定有小于target的最大值
// lower的问题，如果arr[mid] < target此时l=mid但是如果l和r相邻的时候，满足条件后此时mid又会变成l，进入死循环
// 为什么upper不会出现这个问题，因为upper的循环中中左边界一定会改变(l = mid+1 , r = mid)，
// 相邻的时候 ， （1-0）/2 = 0,如何解决这个问题:1.单独判断（bobo认为不优雅） 2. 在数学上，即使l和r相邻，(r-l)/2其实是等于0.5，其实真正的middle值是l+0.5，只不过对于计算机整形想下取整把0.5吞掉了，我们把mid改成上取整的方式，
function lower(arr,target){
    let l = -1
    let r = arr.length-1
    // 循环不变量[l,...r]中一定存在一个小于target的最大值
    while(l<r){
        let mid = l+(r-l+1)/2
        if(arr[mid] >= target){
            r=mid-1
        }else { // <
            l = mid
        }
    }
    // l ===r
    return l
}

function lower_floor(){

}

function upper_floor(){

}

