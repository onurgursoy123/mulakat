<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];
    protected $casts = [
        'name' => 'integer',
    ];
    public function accountTypes()
    {
        return $this->belongsToMany(AccountType::class, 'banks_interest', 'bank_id', 'account_type_id')->withPivot('period', 'housing_loan', 'transport_loan');
    }
    public function banks_interests()
    {
        return $this->morphMany(BanksInterests::class, 'bank_id');
    }
    public function credits_max_amount()
    {
        return $this->hasMany(CreditsMaxAmount::class, 'bank_id');
    }
    
}
